import React from "react";

function SelectComp({ formData, handleChange }) {
  return (
    <label class="text-gray-700 mb-8 " for="animals">
      <select
        value={formData?.role}
        onChange={handleChange}
        name="role"
        id="role"
        class=" mb-5 bg-white border border-gray-300 rounded-xl w-full py-2 px-4 shadow-sm h-12  focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="">Select a Role</option>
        <option value="Farmer">Farmer</option>
        <option value="Dealer">Dealer</option>
        <option value="Wholesaler">Wholesaler</option>
        <option value="Seller">Seller</option>
      </select>
    </label>
  );
}

export default SelectComp;
