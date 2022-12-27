import Image from "next/image";
import StatsIcon from "../../public/stats.png";
export const StatsModal = () => {
  return (
    <>
      <label htmlFor="StatsModal">
        <figure className={` cursor-pointer`}>
          <Image src={StatsIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="StatsModal" />

      <label htmlFor="StatsModal" className={`modal`}>
        <label className="modal-box bg-white" htmlFor="">
          <h1 className="text-2xl font-bold text-center">Stats</h1>
        </label>
      </label>
    </>
  );
};
