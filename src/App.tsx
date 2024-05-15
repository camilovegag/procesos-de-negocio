import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Checkbox } from "./components/ui/checkbox";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

const formSchema = z.object({
  customerName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre debe tener menos de 50 caracteres."),
  customerType: z.enum(["estrella", "vaca", "perro", "interrogante"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_type") {
        return { message: "Selecciona un tipo de cliente válido." };
      }
      return { message: "Tipo de cliente inválido." };
    },
  }),
  criticalityLevel: z.enum(["muy alto", "alto", "medio", "bajo", "muy bajo"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_type") {
        return { message: "Selecciona un nivel de criticidad válido." };
      }
      return { message: "Nivel de criticidad inválido." };
    },
  }),
  escalationNecessary: z.boolean(),
  additionalComments: z
    .string()
    .min(2, "Los comentarios deben tener al menos 2 caracteres.")
    .max(500, "Los comentarios deben tener menos de 500 caracteres.")
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

function App() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerType: undefined,
      criticalityLevel: undefined,
      escalationNecessary: false,
      additionalComments: undefined,
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <main className="flex flex-col gap-6 w-[min(600px,85vw)] m-auto py-10">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Formulario de gestión inicial de ticket por CS
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="customerName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nombre del cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ej: Universidad Autónoma de Mazatlán"
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerType"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Tipo de cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="estrella">⭐️ Estrella</SelectItem>
                    <SelectItem value="vaca">🐮 Vaca</SelectItem>
                    <SelectItem value="perro">🐶 Perro</SelectItem>
                    <SelectItem value="interrogante">
                      ❓ Interrogante
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="criticalityLevel"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nivel de criticidad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el nivel de criticidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="muy alto">Muy Alto</SelectItem>
                    <SelectItem value="alto">Alto</SelectItem>
                    <SelectItem value="medio">Medio</SelectItem>
                    <SelectItem value="bajo">Bajo</SelectItem>
                    <SelectItem value="muy bajo">Muy bajo</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="escalationNecessary"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Escalamiento</FormLabel>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>¿Es necesario escalar?</FormLabel>
                  </div>
                </div>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Comentarios adicionales</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Añade comentarios adicionales"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </main>
  );
}

export default App;
