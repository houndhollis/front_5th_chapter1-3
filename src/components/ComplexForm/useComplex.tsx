import { useNotificationContext } from "../../context/useNotificationContext";
import { useCallback } from "../../@lib";
import { useForm } from "react-hook-form";
import { ComplexType } from "../../type";

export const useComplex = () => {
  const { addNotification } = useNotificationContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ComplexType>({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      preferences: [] as string[],
    },
  });

  const onSubmit = useCallback(() => {
    addNotification("폼이 성공적으로 제출되었습니다", "success");
  }, [addNotification]);

  const handleCheckboxChange = useCallback(
    (currentValues: string[], value: string, checked: boolean): string[] => {
      return checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);
    },
    []
  );

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleCheckboxChange,
  };
};
