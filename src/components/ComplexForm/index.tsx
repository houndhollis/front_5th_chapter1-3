import { renderLog } from "../../utils";
import { memo } from "../../@lib";
import { useComplex } from "./useComplex";
import { Controller } from "react-hook-form";

const PREFERENCES_LIST = ["독서", "운동", "음악", "여행"];

export const ComplexForm: React.FC = memo(() => {
  renderLog("ComplexForm rendered");

  const {
    handleSubmit,
    onSubmit,
    errors,
    register,
    control,
    handleCheckboxChange,
  } = useComplex();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name", { required: "이름은 필수입니다" })}
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          {...register("email", {
            required: "이메일은 필수입니다",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식이 올바르지 않습니다",
            },
          })}
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="number"
          {...register("age", {
            required: "나이은 필수입니다",
            valueAsNumber: true,
            min: { value: 1, message: "1세 이상만 입력하세요" },
          })}
          placeholder="나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}

        <div className="space-x-4">
          <Controller
            control={control}
            name="preferences"
            render={({ field }) => (
              <>
                {PREFERENCES_LIST.map((pref) => (
                  <label key={pref} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      value={pref}
                      checked={field.value.includes(pref)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        field.onChange(
                          handleCheckboxChange(field.value, value, checked)
                        );
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{pref}</span>
                  </label>
                ))}
              </>
            )}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
});
