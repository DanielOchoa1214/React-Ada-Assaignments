import "./App.css";
import { registerUser } from "./services/registerUser";
import { useForm } from "react-hook-form"

export function App() {
  const { register, handleSubmit, formState: { errors, isDirty, isValid }, getValues } = useForm({
    mode: "onChange"
  });
  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email
            <input type="email" placeholder="Email"
              {...register("email", { 
                required: "email is required", 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'email is invalid'
                },
              })}
            />
          </label>
          {errors.email?.message && (<span className="error" role="alert">{errors.email.message}</span>)}
        </div>
        <div>
          <label>
            Name
            <input type="text" placeholder="Name" 
              {...register("name", {
                required: "name is required"
              })}
            />
          </label>
          {errors.name?.message && (<span className="error" role="alert">{errors.name.message}</span>)}
        </div>
        <div>
          <label>
            Age
            <input type="number" placeholder="Age" 
              {...register("age", {
                required: "age is required",
                min: {
                  value: 18,
                  message: "you must be above 18 to register"
                }
              })}
            />
          </label>
          {errors.age?.message && (<span className="error" role="alert">{errors.age.message}</span>)}
        </div>
        <div>
          <label>
            Password
            <input type="password" placeholder="Password" 
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 5,
                message: "password is too short"
              },              
            })}
            />
          </label>
          {errors.password?.message && (<span className="error" role="alert">{errors.password.message}</span>)}
        </div>
        <div>
          <label>
            Password check
            <input type="password" placeholder="Password check" 
            {...register("passwordCheck", {
              validate: {
                matchPasswords: x => x === getValues("password") || "passwords do not match"
              }
            })}
            />
          </label>
          {errors.passwordCheck?.message && (<span className="error" role="alert">{errors.passwordCheck.message}</span>)}
        </div>
        <div>
          <label>
            <input type="checkbox" 
            {...register("check", {
              validate: {
                checked: x => x === true || "please read and accept the terms and conditions"
              }
            })}
            />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          {errors.check?.message && (<span className="error" role="alert">{errors.check.message}</span>)}
        </div>
        <button disabled={!isDirty || !isValid}>Sign up</button>
      </form>
    </div>
  );
}
