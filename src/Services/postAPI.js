import axios from "axios";

export const deleteCandidate = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "delete",
    url: `https://acadshr.herokuapp.com/ahr/candidate/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const createUser = (data) => {
  let config = {
    method: "post",
    url: `https://acadshr.herokuapp.com/user`,
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
    url: `https://acadshr.herokuapp.com/ahr/job/createJob`,
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
    url: `https://acadshr.herokuapp.com/ahr/job/`+data._id,
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
    url: `https://acadshr.herokuapp.com/user/${id}`,
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
    url: `https://acadshr.herokuapp.com/ahr/job/list`,
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
    url: `https://acadshr.herokuapp.com/Orders/admin/createNewOrder`,
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
    url: `https://acadshr.herokuapp.com/admin/product_management/testimonials`,
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
    url: `https://acadshr.herokuapp.com/admin/product_management/terms_and_conditions`,
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
    url: `https://acadshr.herokuapp.com/admin/product_management/privacy_policy`,
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
    url: `https://acadshr.herokuapp.com/admin/product_management/faq`,
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
    url: `https://acadshr.herokuapp.com/admin/plan`,
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
  let token = localStorage.getItem("token");
  let config = {
    method: "put",
    url: `https://acadshr.herokuapp.com/admin/plan/${id}`,
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
    url: `https://acadshr.herokuapp.com/admin/course/${id}`,
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
    url: `https://acadshr.herokuapp.com/admin/course/specialization/${id}`,
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
    url: `https://acadshr.herokuapp.com/admin/college/${id}`,
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
    url: `https://acadshr.herokuapp.com/admin/university/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};
