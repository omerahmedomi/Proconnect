import { months } from "./experienceinfo";
export default function ExperienceDisplay({experience:e}){
    return (
      <div className="flex flex-col mt-2 pb-4">
        <p className="font-semibold text-[13px]">{e?.title}</p>
        <p className="text-xs">
          {e?.company} {e?.type && ". " + e?.type}
        </p>
        <p className="text-[11px] text-gray-500">
          {months[e?.startMonth - 1]?.slice(0, 3)} {e?.startYear}{" "}
          {(e?.startMonth || e?.endMonth || e?.startYear || e?.endYear) && "-"}{" "}
          {e?.current ? "Present" : months[e?.endMonth - 1]?.slice(0, 3)+" "+e?.endYear}
        </p>
        <p className="text-gray-500 text-[11px]">
          {e?.location} {e?.locationType && ". " + e?.locationType}
        </p>
      </div>
    );
}