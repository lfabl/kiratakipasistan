import { gql } from "apollo-boost";

export const home = gql`
        query {
            home{
                message,
                code,
                approaching {
                    id,
                    title,
                    contract {
                        id
                    }
                },
                pastEstateData {
                    id,
                    title,
                    contract {
                        id,
                        contractDate
                    }
                },
                totalEstatesCount,
                totalActiveEstateCount,
                totalPassiveEstateCount,
                totalTenantCount
            }
        }  
`;