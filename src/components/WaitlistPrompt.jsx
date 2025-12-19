const WaitlistPrompt = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-7
                   animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full
                          bg-orange-100 text-orange-600 text-xl"
          >
            ⏳
          </div>
          <h2 className="text-xl font-bold text-gray-800">Slot Unavailable</h2>
        </div>

        {/* Message */}
        <p className="text-gray-600 leading-relaxed">
          This slot is currently fully booked.
          <br />
          <span className="text-sm text-gray-500">
            Join the waitlist and we’ll notify you if it becomes available.
          </span>
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 rounded-lg
                       border border-gray-300 text-gray-700
                       hover:bg-gray-100 transition"
          >
            Not Now
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 rounded-lg
                       bg-orange-500 hover:bg-orange-600
                       text-white font-semibold shadow-sm transition"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPrompt;
