package siit.isamrs2020.backend.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import siit.isamrs2020.backend.DocumentPOJO.DoctorPOJO;
import siit.isamrs2020.backend.Repositories.DoctorRepository;

@EnableMongoRepositories(basePackageClasses = DoctorRepository.class)
@Configuration
public class MongoDBConfig {

  @Bean
  CommandLineRunner commandLineRunner(DoctorRepository doctorRepository) {
    return strings -> {
      doctorRepository.save(new DoctorPOJO(1, "Bojan", "Cakic"));

    };

  }

}