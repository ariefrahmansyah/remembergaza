import { Person } from "@/lib/db";

interface PersonCardProps {
  person: Person;
}

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 rounded-full cursor-default hover:shadow-sm hover:bg-white/5 transition-colors duration-300">
      <h3 className="font-semibold text-lg md:text-xl text-white mb-1 leading-tight">
        {person.name}
      </h3>
      <p className="text-base text-white mb-1 leading-tight">
        {person.en_name}
      </p>
      <p className="text-sm text-slate-300">{person.age} years old</p>
    </div>
  );
};
