export default function SideMenu({ menu, selected, onClick }){
  return (
    <aside className="h-screen sticky w-64 bg-purple-800 text-white">
      <ul>
        {menu.map((option, index) => (
          <li 
            key={index} 
            className={`p-4 cursor-pointer hover:bg-purple-700 ${selected === index ? 'bg-purple-700' : ''}`}
            onClick={() => onClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>
    </aside>
  );
}