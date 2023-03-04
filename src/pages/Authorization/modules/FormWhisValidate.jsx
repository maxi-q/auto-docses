import React from "react";
import { useForm } from "react-hook-form"; 
import styled from 'styled-components'


const FormWhisValidate = ({ defaultValues, children, onSubmit }) => {

  const methods = useForm({ defaultValues });
  const { handleSubmit, formState: { errors } } = methods;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name,
                  errors: errors
              }
              })
          : child;
      })}
    </Form>
  );
}

export { FormWhisValidate } 

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
