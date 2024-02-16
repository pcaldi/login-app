interface ButtonStyle {
  button: {
    backgroundColor: string;
    borderWidth?: number;
    borderColor?: string;
  };
  title: {
    color: string;
  };
  icon: {
    color: string;
  };
}

export interface ButtonVariant {
  enabled: ButtonStyle;
  disabled: ButtonStyle;
}

const buttonPrimary: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "#6c7fd8",
    },
    title: {
      color: "#FFF",
    },
    icon: {
      color: "#FFF",
    },
  },
  disabled: {
    button: {
      backgroundColor: "#B8B8B8",
    },
    title: {
      color: "#FFF",
    },
    icon: {
      color: "#FFF",
    },
  },
};
const buttonOutline: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#6c7fd8",
    },
    title: {
      color: "#c7c7c7",
    },
    icon: {
      color: "#6c7fd8",
    },
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#B8B8B8",
    },
    title: {
      color: "#B8B8B8",
    },
    icon: {
      color: "#B8B8B8",
    },
  },
};

export const buttonEdit: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "#FBB605",
    },
    title: { color: "#F5F5F5" },
    icon: { color: "#f5F5F5" },
  },
  disabled: {
    button: {
      backgroundColor: "#B8B8B8",
    },
    title: { color: "#FFF" },
    icon: { color: "#FFF" },
  },
};

export const buttonDelete: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#DC4525",
    },
    title: { color: "#DC4525" },
    icon: { color: "#DC4525" },
  },
  disabled: {
    button: {
      backgroundColor: "#B8B8B8",
    },
    title: { color: "#FFF" },
    icon: { color: "#FFF" },
  },
};

export const variants = {
  primary: buttonPrimary,
  outline: buttonOutline,
  edit: buttonEdit,
  delete: buttonDelete,
};
