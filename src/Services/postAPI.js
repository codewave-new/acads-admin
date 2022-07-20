import axios from "axios";

export const deleteCandidate = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "delete",
    url: `https://backend.acadshr.com/ahr/candidate/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const createUser = (data) => {
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/user`,
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const transactions = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/Orders/transactions`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const createTransactions = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/Orders/admin/transaction`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const createJob = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/ahr/job/createJob`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};
export const updateJob = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "put",
    url: `https://backend.acadshr.com/ahr/job/`+data._id,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const deleteUser = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "delete",
    url: `https://backend.acadshr.com/user/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const JobList = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/ahr/job/list`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data:{
      ...data
    }
  };
  return axios(config);
};

export const CandidateListing = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/candidate/jobs/list`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data:{
      ...data
    }
  };
  return axios(config);
};


export const createOrder = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/Orders/admin/createNewOrder`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data:{
      ...data
    }
  };
  return axios(config);
};


export const createTestimonial = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/admin/product_management/testimonials`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const createTAndC = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/admin/product_management/terms_and_conditions`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const createPrivacyPolicy = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/admin/product_management/privacy_policy`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const createFAQ = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/admin/product_management/faq`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const createPlan = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/admin/plan`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

export const editPlan = (data, id) => {
  console.log(data)
  let token = localStorage.getItem("token");
  let config = {
    method: "put",
    url: `https://backend.acadshr.com/admin/plan/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};


export const editCourse = (data, id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "put",
    url: `https://backend.acadshr.com/admin/course/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};


export const editSpecialization = (data, id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "put",
    url: `https://backend.acadshr.com/admin/course/specialization/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};


export const editColleges = (data, id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "put",
    url: `https://backend.acadshr.com/admin/college/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};


export const editUniversities = (data, id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "put",
    url: `https://backend.acadshr.com/admin/university/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};
