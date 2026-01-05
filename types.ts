
export interface ServiceTime {
  day: string;
  time: string;
  name: string;
  description: string;
}

export interface Ministry {
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  roleNe: string;
  bio: string;
  bioNe: string;
  imageUrl: string;
}

export interface BranchDetails {
  id: string;
  name: string;
  nameNe: string;
  location: string;
  locationNe: string;
  established: string;
  startTime: string;
  leader: string;
  contact: string;
  description: string;
  mapQuery: string;
}
