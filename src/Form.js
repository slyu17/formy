import React, {useState} from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import {InputGroup} from "@blueprintjs/core";

export default function Formy({schema}){
  return <Formik
    initialValues={{ username: '', password: '' }}
    validate={values => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Email is Required';
      } else if (values.username.length<6) {
        errors.username = 'Username too short';
      }
      if(!values.password || values.password.length<6) {
        errors.password = 'Password too short'
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting, setFieldValue, onBlur, onChange, errors }) => {
      return <Form style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {schema.map((f,i)=>{
          return <Field key={i} type={f.type} 
            name={f.name} onBlur={onBlur}
            onChange={e=> setFieldValue(f.name,e.target.value)}
            error={errors[f.name]}
          />
        })}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    }}
  </Formik>
}

function Field({type,name,onChange,onBlur,error}){
  return <div style={{margin:'10px 0'}}>
    <InputGroup 
      name={name}
      type={type}
      placeholder={'Enter your '+name}
      onChange={onChange}
      onBlur={onBlur}
    />
    <div style={{color:'red'}}>{error}</div>
  </div>
}
