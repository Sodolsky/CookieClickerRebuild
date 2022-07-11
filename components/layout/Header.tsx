import { EqualibrumStacksDisplay } from "../skillTree/EqualibrumStacksDisplay";

export const Header = () => {
  return (
    <>
      <header className="text-xl lg:text-3xl mt-4 flex gap-2 justify-center">
        <h1>Cookie Clicker Rebuild</h1>
        <div>
          <EqualibrumStacksDisplay />
        </div>
      </header>
    </>
  );
};
