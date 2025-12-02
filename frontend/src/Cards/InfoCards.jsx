const InfoCards = ({ icon, label, value, color }) => {
  return (
    <div className="w-full p-5 rounded-xl shadow-md border border-gray-300 bg-white flex items-center justify-between mt-20">
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>
      <div
        className="p-4 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
    </div>
  );
};

export default InfoCards;
