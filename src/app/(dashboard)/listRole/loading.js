export default function Loading() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <img 
        src="/bouncing-circles.svg" 
        alt="loading" 
        width={150} 
        height={50} 
      />
    </div>
  );
}
