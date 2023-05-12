/* eslint-disable react/prop-types */
import "./Table.css";

const Table = (props) => {
  const tableData = props.data;
  const genderOptions = ["male", "female"];
  const statusOptions = ["active", "inactive"];

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item._id}>
            <td>
              <input readOnly defaultValue={item.name} />
            </td>
            <td>
              <input readOnly defaultValue={item.email} />
            </td>
            <td>
              <select
                value={item.gender}
                onChange={(e) =>
                  props.onHandleUpdate(item._id, "gender", e.target.value)
                }
              >
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                value={item.status}
                onChange={(e) =>
                  props.onHandleUpdate(item._id, "status", e.target.value)
                }
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
