import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const AddExpenseModal = ({ open, onClose, onSubmit }) => {
  const initialForm = {
    icon: "🧾",
    category: "",
    amount: "",
    date: "",
  };

  const [form, setForm] = useState(initialForm);
  const [emojiOpen, setEmojiOpen] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) setForm(initialForm);
  }, [open]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEmojiSelect = (emoji) => {
    const selected = emoji?.emoji ?? "";
    setForm((prev) => ({ ...prev, icon: selected }));
    setEmojiOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.amount || !form.date) {
      alert("Please fill all fields");
      return;
    }

    onSubmit({
      icon: form.icon,
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
    });

    onClose(); // close modal
  };

  if (!open) return null;

  return (
    <>
      {/* Main Modal Background */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl animate-fadeIn">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <BsEmojiSmile className="text-xl text-gray-600" />
            <h2 className="text-xl font-semibold">Add Expense</h2>
          </div>

          {/* Icon */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Select an Emoji
            </label>

            <div className="flex items-center gap-3">
              <div className="text-4xl">{form.icon}</div>

              <button
                onClick={() => setEmojiOpen(true)}
                className="px-3 py-2 bg-gray-100 rounded-lg border hover:bg-gray-200 transition"
              >
                Choose Emoji
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">

            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Transport, Food, Bills"
                className="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-red-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-red-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-red-200 outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-md"
            >
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* Emoji Picker Popup */}
      {emojiOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[70]">
          <div className="bg-white rounded-2xl p-3 shadow-xl">
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              height={350}
              width={320}
            />

            <div className="mt-2 text-right">
              <button
                onClick={() => setEmojiOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddExpenseModal;
