import axios from "axios";
import { Assets, Companies, Locations } from "../../types/response";
const api = "https://fake-api.tractian.com";

class CompaniesService {
  public async findAllCompanies() {
    const response = await axios.get(`${api}/companies`);
    return response.data as Companies;
  }

  public async findAllLocations(companyId: string) {
    const response = await axios.get(`${api}/companies/${companyId}/locations`);
    return response.data as Locations[];
  }

  public async findAllAssets(companyId: string) {
    const response = await axios.get(`${api}/companies/${companyId}/assets`);
    return response.data as Assets[];
  }
}

export const companiesService = new CompaniesService();
