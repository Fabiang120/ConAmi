export function ProfileModal({ profile, onClose }) {
  if (!profile) return null;

  return (
    <div 
    className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
    onClick={onClose}
    >

      <div 
      className="relative bg-white rounded-2xl shadow-xl p-8 w-[500px] max-w-[90%] overflow-hidden"
      onClick={(e) => e.stopPropagation()}>
        <button 
        className="absolute top-4 right-4 text-gray-500 cursor-pointer"
        onClick={onClose}>X</button>

        <div className="bg-[#63372C] h-32"></div>

        <div className ="flex justify-center">
            <div className="w-28 h-28 bg-white rounded-full -mt-14 border-4 border-white shadow-md"></div>
        </div>

        <div className="text-center mt-3 space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">{profile.username}</h1>
            <p className="text-gray-400 text-sm">{profile.email}</p>
            <p className="text-gray-500 text-sm">{profile.gender} • {profile.age}</p>
        </div>
        <div className="flex justify-between items-stretch mt-8 px-8 text-center">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg font-semibold">{profile.fluent}</p>
            <p className="text-xs text-gray-400 tracking-wide">FLUENT IN</p>
          </div>
          <div className="w-[2px] bg-gray-200 self-stretch"></div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg font-semibold">{profile.practice}</p>
            <p className="text-xs text-gray-500">{profile.proficiency}</p>
            <p className="text-xs text-gray-400 tracking-wide">PRACTICING</p>
          </div>
          <div className="w-[2px] bg-gray-200 self-stretch"></div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg font-semibold">{profile.country}</p>
            <p className="text-xs text-gray-400 tracking-wide">COUNTRY</p>
          </div>
        </div>
      </div>
    </div>
  );
}