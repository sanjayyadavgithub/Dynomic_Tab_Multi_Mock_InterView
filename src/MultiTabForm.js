import React, { useState } from "react";

const MultiTabForm = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    email: "",
    interest: "",
    subscribe: false,
    notification: "none",
  });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");

  const tabs = ["Profile", "Interest", "Settings"];

  const validate = () => {
    let newErrors = {};
    if (!formData.age || isNaN(formData.age)) {
      newErrors.age = "Age is required and must be numeric";
    }
    if (
      !formData.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }
    if (currentTab === 2 && !formData.notification) {
      newErrors.notification = "Select a notification preference";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentTab((prev) => prev + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmissionMessage("Form submitted successfully!");
      alert(`age = ${formData.age} & Email = ${formData.email}`);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: "40px",
          padding: "30px 10px",
          fontSize: "30px",
          borderRadius: "10px",
        }}
      >
        Multi-Tab Form Mock InterView
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          border: "1px solid black",
          padding: "10px 20px",
          borderRadius: "20px",
          backgroundColor: "lightgray",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setCurrentTab(index)}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              background: currentTab === index ? "#007bff" : "#fff",
              color: currentTab === index ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              width: "30%",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {currentTab === 0 && (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
            </div>
            <br />
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
          </div>
        )}

        {currentTab === 1 && (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <label>Select Interest:</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Sports">Sports</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <br />
            <div>
              <label>
                <input
                  type="checkbox"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                />{" "}
                Subscribe to Newsletter
              </label>
            </div>
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <label>Notification Preferences:</label>
            <br />
            <br />
            <div>
              <label>
                <input
                  type="radio"
                  name="notification"
                  value="email"
                  checked={formData.notification === "email"}
                  onChange={handleChange}
                />{" "}
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="notification"
                  value="sms"
                  checked={formData.notification === "sms"}
                  onChange={handleChange}
                />{" "}
                SMS
              </label>
              <label>
                <input
                  type="radio"
                  name="notification"
                  value="none"
                  checked={formData.notification === "none"}
                  onChange={handleChange}
                />{" "}
                None
              </label>
              {errors.notification && (
                <p style={{ color: "red" }}>{errors.notification}</p>
              )}
            </div>
            <br />
            <button
              type="submit"
              style={{
                padding: "10px",
                marginTop: "10px",
                background: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                width: "40%",
              }}
            >
              Submit
            </button>
          </div>
        )}
      </form>

      {currentTab < 2 && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleNext}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              width: "25%",
            }}
          >
            Next
          </button>
        </div>
      )}

      {submissionMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{submissionMessage}</p>
      )}
    </div>
  );
};

export default MultiTabForm;
