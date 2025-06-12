import UpdateRoleSection from '../components/UpdateRoleSection'

export const metadata = {
  title: "Role Detail | Admin | Click Ship & Go",
  description: "Role Detail page",
};

export default function UpdateRole({params}) {
      const {roleID} =params
  return (
    <UpdateRoleSection roleID={roleID}/>
  )
}

