export function switchLanguagePath(pathname: string, search = "", hash = ""): string {
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const bare = english ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const explorer = bare === "/utforska" || bare === "/explore";
  const target = explorer ? (english ? "/utforska" : "/en/explore") : english ? bare : `/en${bare === "/" ? "" : bare}`;
  return `${target}${search}${hash}`;
}
