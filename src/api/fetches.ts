import axios from "axios";

/**
 *
 * @param id 유저 id
 * @param tenant type Tenant
 */

export const editUserInfoFetch = async (id: number, tenant: Tenant) => {
  const res = await axios.patch(`http://localhost:4000/tenants/${id}`, {
    ...tenant,
  });

  console.log("결과");
  console.log(res);
};
