export const permissions = {
  owner: {
    canEdit: true,
    canDelete: true,
    canInvite: true,
    canAssign: true
  },

  admin: {
    canEdit: true,
    canDelete: false,
    canInvite: true,
    canAssign: true
  },

  member: {
    canEdit: true,
    canDelete: false,
    canInvite: false,
    canAssign: false
  }
};

export default permissions;