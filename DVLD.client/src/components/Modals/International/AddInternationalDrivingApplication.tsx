import { useState } from "react";

const AddInternationalDrivingApplication = () => {
  const [id, setId] = useState<string>("0");
  return (
    <main>
      <section>
        <div>
          <label>
            License ID:
            <input
              type="text"
              value={id}
              onChange={(e) => {
                if (typeof +e.target.value == "number") setId(e.target.value);
              }}
            />
          </label>
        </div>
      </section>
    </main>
  );
};

export default AddInternationalDrivingApplication;
