import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { postValidationSchema } from "../../utils/validators";
import ImageInput from "../ImageInput";

export type PostFormProps = {
  readonly initialValues: Record<string, unknown>;
  readonly submitTitle: string;
  readonly handleSubmit: (e: any) => void;
  readonly resetForm: () => void;
};

export default function PostForm({
  initialValues,
  submitTitle,
  resetForm,
  handleSubmit,
}: PostFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={postValidationSchema}
      onReset={resetForm}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>Título</FormLabel>
              <Input
                name="title"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title as string}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Descrição</FormLabel>
              <Input
                name="description"
                onChange={handleChange}
                value={values.description as string}
                onBlur={handleBlur}
                type="text"
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.image}>
              <Field
                name="image"
                label="Upload de Imagem"
                component={ImageInput}
              />
              <FormErrorMessage>{errors.image}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="green">
              {submitTitle}
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
