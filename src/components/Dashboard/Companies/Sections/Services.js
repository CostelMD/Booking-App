import React, { useState } from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import AvailabityTable from "../AvailabityTable";
import Selector from "../Selector";
import ButtonGroup from "@ramonak/react-button-group";
import { useFormik } from "formik";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import {
  ADDNEWSERVICE,
  ADDSERVICES,
} from "../../../../store/actions/actionTypes";
import { useDispatch } from "react-redux";

import * as yup from "yup";

import { validateServiceForm as validate } from "../../../../services/ValidateAddCompanyForm.service";

const Services = (props) => {
  const [serviceName, setServiceName] = useState();
  const [description, setDescription] = useState();
  const [availability, setAvailability] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [capacity, setCapacity] = useState();
  const [servicesNumber, setServicesNumber] = useState(1);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    console.log(serviceName, description, duration, price, capacity);
    e.preventDefault();
  };

  const newService = [
    { day: "SUNDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "MONDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    {
      day: "TUESDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
    {
      day: "WEDNESDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
    {
      day: "THURSDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
    { day: "FRIDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    {
      day: "SATURDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
  ];
  const handleButtonSelection = (e) => {
    e.preventDefault();
    console.log(e.target.name);
  };

  const validationSchema = yup.object().shape({
    services: yup.array().of(
      yup.object().shape({
        serviceName: yup.string().min(3),
        description: yup.string().min(3),
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        services: [
          {
            serviceName: "",
            description: "",
            duration: "",
            price: "",
            capacity: "",
          },
        ],
      }}
      onSubmit={(values) => {
        const newServices = values.services;

        dispatch({ type: ADDSERVICES, payload: newServices });

        console.log("submit");
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, validateForm }) => (
        <Form>
          <FieldArray name="services">
            {({ push, replace }) => (
              <>
                {values.services.map((service, index) => {
                  //service name
                  const serviceName = `services[${index}].serviceName`;
                  const serviceNameErrorMessage = getIn(errors, serviceName);
                  //description name
                  const descriptionName = `services[${index}].description`;
                  const descriptionErrorMessage = getIn(
                    errors,
                    descriptionName
                  );
                  //duration name
                  const durationName = `services[${index}].duration`;
                  const durationErrorMessage = getIn(errors, duration);
                  //price name
                  const priceName = `services[${index}].price`;
                  const priceErrorMessage = getIn(errors, price);
                  //capacity name
                  const capacityName = `services[${index}].capacity`;
                  const capacityErrorMessage = getIn(errors, capacity);

                  return (
                    <div key={index}>
                      <div className={styles.formInput}>
                        <p>Service name</p>
                        <Field
                          name={serviceName}
                          value={service.serviceName}
                        ></Field>
                        <div style={{ color: "red" }}>
                          {serviceNameErrorMessage}
                        </div>
                      </div>
                      <div className={styles.formInput}>
                        <p>Description</p>
                        <Field
                          name={descriptionName}
                          value={service.description}
                        ></Field>
                        <div style={{ color: "red" }}>
                          {descriptionErrorMessage}
                        </div>
                      </div>
                      <div className={styles.formInput}>
                        <AvailabityTable index={index}></AvailabityTable>
                      </div>
                      <div className={styles.formInput}>
                        <ButtonGroup
                          containerClassName={styles.container}
                          buttonClassName={styles.buttonContainer}
                          activeButtonClassName={styles.activeButtonContainer}
                          buttons={[
                            "30",
                            "60",
                            "90",
                            "120",
                            "150",
                            "180",
                            "210",
                          ]}
                          onButtonClick={(e) => {
                            e.preventDefault();
                            replace(index, {
                              ...service,
                              duration: e.target.name,
                            });
                          }}
                        />{" "}
                        {/* <div style={{ color: "red" }}>
                          {durationErrorMessage}
                        </div> */}
                        <p>Add duration manually</p>
                        <Field
                          className={styles.manualInput}
                          type="text"
                          name={durationName}
                          value={service.duration}
                        ></Field>
                        <button type="button" className={styles.addButton}>
                          {" "}
                          Add duration
                        </button>
                      </div>
                      <div className={styles.formInput}>
                        <p>Price(RON)</p>
                        <ButtonGroup
                          containerClassName={styles.container}
                          buttonClassName={styles.buttonContainer}
                          activeButtonClassName={styles.activeButtonContainer}
                          buttons={["10", "20", "30", "40", "50", "60", "70"]}
                          onButtonClick={(e) => {
                            e.preventDefault();
                            replace(index, {
                              ...service,
                              price: e.target.name,
                            });
                          }}
                        />
                        <p>Add duration manually</p>
                        <Field
                          className={styles.manualInput}
                          type="text"
                          name={priceName}
                          value={service.price}
                        ></Field>
                        <button type="button" className={styles.addButton}>
                          {" "}
                          Add price
                        </button>
                      </div>
                      <div className={styles.formInput}>
                        <p>Capacity(person)</p>

                        <ButtonGroup
                          containerClassName={styles.container}
                          buttonClassName={styles.buttonContainer}
                          activeButtonClassName={styles.activeButtonContainer}
                          buttons={[
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                          ]}
                          onButtonClick={(e) => {
                            e.preventDefault();
                            replace(index, {
                              ...service,
                              capacity: e.target.name,
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className={styles.addServiceButton}
                  onClick={() => {
                    push({ serviceName: "", description: "" });
                    dispatch({ type: ADDNEWSERVICE });
                  }}
                >
                  Add Service
                </button>
              </>
            )}
          </FieldArray>

          <button type="submit" className={styles.submitForm}>
            Save services
          </button>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre>

          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default Services;
