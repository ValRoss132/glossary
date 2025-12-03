export const getDomain = (str: string) => {
	return new URL(str).hostname
}
