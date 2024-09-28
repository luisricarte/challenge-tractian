import axios from "axios";
const api = "https://fake-api.tractian.com";

class CompaniesService {
  public async findAllCompanies() {
    const response = await axios.get(`${api}/companies`);
    return response.data;
  }

  public async findAllLocationsCompanies(companyId: string) {
    const response = await axios.get(`${api}/${companyId}/locations`);
    return response.data;
  }

  public async findAllAssetsCompanies(companyId: string) {
    const response = await axios.get(`${api}/${companyId}/assets`);
    return response.data;
  }
}

export const viewsService = new CompaniesService();
