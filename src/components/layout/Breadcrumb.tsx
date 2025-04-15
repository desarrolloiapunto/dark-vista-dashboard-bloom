
import { ChevronRight, Home } from "lucide-react";
import { useLocation } from "react-router-dom";

export function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
      <Home size={16} />
      <ChevronRight size={16} />
      {paths.length === 0 ? (
        <span className="text-foreground">Dashboard</span>
      ) : (
        paths.map((path, index) => (
          <div key={path} className="flex items-center gap-2">
            <span className={index === paths.length - 1 ? "text-foreground" : ""}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </span>
            {index < paths.length - 1 && <ChevronRight size={16} />}
          </div>
        ))
      )}
    </div>
  );
}
