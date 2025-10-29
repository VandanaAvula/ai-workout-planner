export default function PlanCard({ text }) {
  return (
    <div className=" whitespace-pre-line" tabIndex="0" aria-live="polite">
      {text.length > 0
        ? text.map((planItem, index) => (
            <div
              key={index}
              className=" bg-indigo-100 p-4 rounded mt-4 plan-item"
            >
              <div className="font-bold mb-2">{planItem}</div>
            </div>
          ))
        : "No Plan Available"}
    </div>
  );
}
