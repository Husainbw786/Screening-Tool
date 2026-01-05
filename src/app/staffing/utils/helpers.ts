export const normalizeSkills = (
  skills: string | string[] | undefined,
): string[] => {
  if (!skills) return [];
  try {
    if (Array.isArray(skills)) return skills;
    return skills.split(",").map((s) => s.trim());
  } catch (err) {
    return [];
  }
};

export const normalizeTotalExperience = (
  value: string | number | undefined,
): number | undefined => {
  if (value === undefined || value === null) {
    return;
  }

  try {
    if (typeof value === "string") {
      if (value.trim() === "") {
        return;
      }
    }

    if (typeof value === "number" && !Number.isNaN(value)) return value;

    const num = Number(value);

    return Number.isNaN(num) ? undefined : num;
  } catch (err) {
    return;
  }
};
