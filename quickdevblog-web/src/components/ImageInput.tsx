import { FieldProps } from "formik";
import { ChangeEvent, useState } from "react";

interface ImageInputProps extends FieldProps {
  label: string;
}
export default function ImageInput({ field, form, label }: ImageInputProps) {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    form.setFieldValue(field.name, file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file as Blob);
  };

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        id={field.name}
        name={field.name}
        type="file"
        onChange={handleImageChange}
        onBlur={form.handleBlur}
      />
      {form.touched[field.name] && form.errors[field.name] ? (
        <div>{form.errors[field.name] as string}</div>
      ) : null}
      {imagePreview && (
        <div>
          <img
            src={imagePreview as string}
            alt="Pré-visualização"
            width="100"
          />
        </div>
      )}
    </div>
  );
}
