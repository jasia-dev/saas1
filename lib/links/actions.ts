"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  linkDeleteSchema,
  linkSchema,
  linkUpdateSchema,
} from "@/lib/links/schemas";
import { createClient } from "@/lib/supabase/server";
import { parseTagList } from "@/lib/tags";

function redirectWithMessage(
  status: "success" | "error",
  message: string,
): never {
  const params = new URLSearchParams({ status, message });
  redirect(`/dashboard?${params.toString()}`);
}

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

async function syncLinkTags({
  supabase,
  userId,
  linkId,
  tagInput,
}: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  userId: string;
  linkId: string;
  tagInput: string;
}) {
  const tagNames = parseTagList(tagInput);
  const { data: existingTags, error: existingTagsError } = await supabase
    .from("tags")
    .select("id, name")
    .eq("user_id", userId);

  if (existingTagsError) {
    throw new Error(existingTagsError.message);
  }

  const tagMap = new Map(
    (existingTags ?? []).map((tag) => [tag.name.toLowerCase(), tag]),
  );
  const missingTagNames = tagNames.filter(
    (tagName) => !tagMap.has(tagName.toLowerCase()),
  );

  if (missingTagNames.length > 0) {
    const { error: insertTagsError } = await supabase.from("tags").insert(
      missingTagNames.map((name) => ({
        user_id: userId,
        name,
      })),
    );

    if (insertTagsError && insertTagsError.code !== "23505") {
      throw new Error(insertTagsError.message);
    }

    const { data: refreshedTags, error: refreshedTagsError } = await supabase
      .from("tags")
      .select("id, name")
      .eq("user_id", userId);

    if (refreshedTagsError) {
      throw new Error(refreshedTagsError.message);
    }

    tagMap.clear();
    (refreshedTags ?? []).forEach((tag) => {
      tagMap.set(tag.name.toLowerCase(), tag);
    });
  }

  const desiredTagIds = tagNames
    .map((tagName) => tagMap.get(tagName.toLowerCase())?.id)
    .filter((id): id is string => Boolean(id));

  const { error: deleteLinkTagsError } = await supabase
    .from("link_tags")
    .delete()
    .eq("link_id", linkId);

  if (deleteLinkTagsError) {
    throw new Error(deleteLinkTagsError.message);
  }

  if (desiredTagIds.length === 0) {
    return;
  }

  const { error: insertLinkTagsError } = await supabase.from("link_tags").insert(
    desiredTagIds.map((tagId) => ({
      link_id: linkId,
      tag_id: tagId,
    })),
  );

  if (insertLinkTagsError) {
    throw new Error(insertLinkTagsError.message);
  }
}

export async function createLinkAction(formData: FormData) {
  const validatedFields = linkSchema.safeParse({
    url: formData.get("url"),
    title: formData.get("title"),
    description: formData.get("description"),
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    redirectWithMessage(
      "error",
      validatedFields.error.issues[0]?.message ?? "Could not create the link.",
    );
  }

  const { supabase, user } = await getAuthenticatedContext();
  const tagInput = String(formData.get("tags") ?? "");
  const { data, error } = await supabase
    .from("links")
    .insert({
    user_id: user.id,
    ...validatedFields.data,
    })
    .select("id")
    .single();

  if (error) {
    redirectWithMessage("error", error.message);
  }

  try {
    await syncLinkTags({
      supabase,
      userId: user.id,
      linkId: data.id,
      tagInput,
    });
  } catch (error) {
    redirectWithMessage(
      "error",
      error instanceof Error ? error.message : "Could not save tags.",
    );
  }

  revalidatePath("/dashboard");
  redirectWithMessage("success", "Link saved.");
}

export async function updateLinkAction(formData: FormData) {
  const validatedFields = linkUpdateSchema.safeParse({
    id: formData.get("id"),
    url: formData.get("url"),
    title: formData.get("title"),
    description: formData.get("description"),
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    redirectWithMessage(
      "error",
      validatedFields.error.issues[0]?.message ?? "Could not update the link.",
    );
  }

  const { supabase, user } = await getAuthenticatedContext();
  const tagInput = String(formData.get("tags") ?? "");
  const { id, ...payload } = validatedFields.data;

  const { error } = await supabase
    .from("links")
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage("error", error.message);
  }

  try {
    await syncLinkTags({
      supabase,
      userId: user.id,
      linkId: id,
      tagInput,
    });
  } catch (error) {
    redirectWithMessage(
      "error",
      error instanceof Error ? error.message : "Could not update tags.",
    );
  }

  revalidatePath("/dashboard");
  redirectWithMessage("success", "Link updated.");
}

export async function deleteLinkAction(formData: FormData) {
  const validatedFields = linkDeleteSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    redirectWithMessage(
      "error",
      validatedFields.error.issues[0]?.message ?? "Could not delete the link.",
    );
  }

  const { supabase, user } = await getAuthenticatedContext();
  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", validatedFields.data.id)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage("error", error.message);
  }

  revalidatePath("/dashboard");
  redirectWithMessage("success", "Link deleted.");
}
