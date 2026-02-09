export const createSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const createUniqueSlug = async (
  text: string,
  checkDuplicate: (slug: string) => Promise<boolean>,
  baseSlug?: string,
): Promise<string> => {
  const baseConfigSlug = baseSlug || createSlug(text);

  let slug = baseConfigSlug;

  let counter = 1;

  let isDuplicate = await checkDuplicate(slug);

  while (isDuplicate) {
    slug = `${baseSlug}-${counter}`;

    isDuplicate = await checkDuplicate(slug);

    counter++;
  }

  return slug;
};
