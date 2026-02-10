import { months } from "./experienceinfo";
export default function EducationDisplay({ education: e }) {
  return (
    <div className="flex flex-col mt-2 pb-4">
      <p className="font-semibold text-[13px]">{e?.school}</p>
      <p className="text-xs">
        {e?.degree} {e?.field && ", " + e?.field}
      </p>
      <p className="text-[11px] text-gray-500">
        {months[e?.startMonth - 1]?.slice(0, 3)} {e?.startYear}{" "}
        {(e?.startMonth || e?.endMonth || e?.startYear || e?.endYear) && "-"}{" "}
        {months[e?.endMonth - 1]?.slice(0, 3)} {e?.endYear}
      </p>
    </div>
  );
}
