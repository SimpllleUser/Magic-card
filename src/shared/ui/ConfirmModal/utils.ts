import { Icons } from '@/core/models/icons';

export const getIconByColor = (color: Colors): Icons => {
  const icons: Record<string, Icons> = {
    primary: Icons.CloseOutline,
    secondary: Icons.CircleCheck,
    success: Icons.CircleCheck,
    warning: Icons.WarningOutline,
    error: Icons.CloseOutline,
    info: Icons.InformationOutline,
    light: Icons.Sun,
    dark: Icons.Moon,
    accent: Icons.StarOutline
  };

  return icons[color] || Icons.Help;
};
