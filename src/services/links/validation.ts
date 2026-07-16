export type ValidateLinkPayload = {
  slug: string;
  destination: string;
  slugStatus: "idle" | "checking" | "available" | "taken";
};

export function validateLink({
  slug,
  destination,
  slugStatus,
}: ValidateLinkPayload) {
  if (!slug.trim()) {
    return {
      valid: false,
      message: "Short Link is required.",
    };
  }

  if (slugStatus !== "available") {
    return {
      valid: false,
      message: "Short Link is unavailable.",
    };
  }

  try {
    const url = new URL(destination);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error();
    }
  } catch {
    return {
      valid: false,
      message: "Invalid destination URL.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}
