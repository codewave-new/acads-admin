import axios from "axios";

export const loginAPI = (data) => {
  return axios.post(`https://backend.acadshr.com/user/login`, data);
};

export const getJobByid=(id)=>{
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: "https://backend.acadshr.com/ahr/job/"+id,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
}

export const getAllCandidates = (search,pageNo,pageSize) => {

  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `https://backend.acadshr.com/ahr/candidate`,
    params:{search,pageNo,pageSize},
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const getCandidateInfo = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `https://backend.acadshr.com/ahr/candidate/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const getAllUsers = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `https://backend.acadshr.com/user`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const getUserInfo = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `https://backend.acadshr.com/user/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const getAllTestimonials = () => {
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: "https://backend.acadshr.com/admin/product_management/testimonials",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};
export const deleteTestimonials = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "delete",
    url: `https://backend.acadshr.com/admin/product_management/testimonial/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};
export const getAllQuestionAnswers = () => {
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `https://backend.acadshr.com/admin/product_management/faq`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};
export const deleteQuestion = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "delete",
    url: `https://backend.acadshr.com/admin/product_management/faq/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const getTAC = () => {
  return axios.get(
    `https://backend.acadshr.com/admin/product_management/terms_and_conditions`
  );
};

export const getInstituteList = () => {
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: "https://backend.acadshr.com/ahr/institute",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};
export const getInstituteDetails = (id) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `https://backend.acadshr.com/ahr/institute/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const getAllTemplates=()=>{
  let token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `https://backend.acadshr.com/descriptiontemplates/getAllTemplates`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
}

export const getAllJobs = (data) => {
  let token = localStorage.getItem("token");
  let config = {
    method: "post",
    url: `https://backend.acadshr.com/ahr/job/list`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
    },
  };
  return axios(config);


  //return axios.post(`https://backend.acadshr.com/ahr/job/list`,data);
};


export const getJobDetails = (id) => {
  return axios.get(
    `https://backend.acadshr.com/ahr/job/${id}`
  );
};
export const MockData=(page)=>{
  return axios.get(`https://reqres.in/api/users?page=${page}`)
}
export const getAllPlans = () =>{
  return axios.get(`https://backend.acadshr.com/admin/plan`)
}

export const getPrivacyPolicy = () =>{
  return axios.get(`https://backend.acadshr.com/admin/product_management/privacy_policy`)
}
export const getTermsAndCondition = () =>{
  return axios.get(`https://backend.acadshr.com/admin/product_management/terms_and_conditions`)
}


export const getAllSpecialization = () => {
  return axios.get(`https://backend.acadshr.com/admin/course/specialization`);
};

export const getAllColleges = () => {
  return axios.get(`https://backend.acadshr.com/admin/college`);
};

export const getAllUniversities = () => {
  return axios.get(`https://backend.acadshr.com/admin/university`);
};

export const getAllCourses = () => {
  return axios.get(`https://backend.acadshr.com/admin/course`);
};
