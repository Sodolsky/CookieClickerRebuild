interface RangeSliderInterface {
  text: string;
  value: number;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const RangeSlider: React.FC<RangeSliderInterface> = ({
  text,
  onChangeFunc,
  value,
}) => {
  return (
    <div className="form-control items-center">
      <label htmlFor="" className="label">
        <span>{text}</span>
      </label>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        className="range range-primary range-md"
        step="1"
        onInput={onChangeFunc}
      />
    </div>
  );
};
