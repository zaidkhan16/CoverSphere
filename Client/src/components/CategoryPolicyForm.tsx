import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientInfoForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CategoryPolicyFormData {
  policyType: string;
  policyDescription: string;
  policyAmount: number;
  coverageDuration: number;
}

export default function CategoryPolicyForm() {
  const [formData, setFormData] = useState<CategoryPolicyFormData>({
    policyType: "",
    policyDescription: "",
    policyAmount: 0,
    coverageDuration: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "policyAmount" || name === "coverageDuration"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.policyType ||
      !formData.policyDescription ||
      formData.policyAmount <= 0 ||
      formData.coverageDuration <= 0
    ) {
      toast.error("Please provide valid inputs for all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:300/category-policy/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit policy.");
      }

      toast.success("Policy submitted successfully!");

      setTimeout(() => {
        navigate("/category-policy");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Error submitting the form. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        top: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="multi-step-form">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <h2>Policy Information Form</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Policy Category</legend>

            <label>
              Policy Type:
              <select
                name="policyType"
                value={formData.policyType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Policy Type</option>
                <option value="health">Health Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="vehicle">Vehicle Insurance</option>
                <option value="home">Home Insurance</option>
                <option value="travel">Travel Insurance</option>
              </select>
            </label>

            <label>
              Policy Description:
              <textarea
                name="policyDescription"
                value={formData.policyDescription}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Policy Amount:
              <input
                type="number"
                name="policyAmount"
                value={formData.policyAmount}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Coverage Duration (Years):
              <input
                type="number"
                name="coverageDuration"
                value={formData.coverageDuration}
                onChange={handleInputChange}
                required
              />
            </label>
          </fieldset>

          <div className="navigation-buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
