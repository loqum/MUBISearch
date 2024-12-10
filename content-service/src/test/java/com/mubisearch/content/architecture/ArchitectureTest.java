package com.mubisearch.content.architecture;

import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

import static com.tngtech.archunit.library.Architectures.onionArchitecture;

@AnalyzeClasses(packages = "com.mubisearch")
public class ArchitectureTest {

    @ArchTest
    public static final ArchRule hexagonal_architecture_is_respected =
            onionArchitecture()
                    .domainModels("..domain.model..")
                    .domainServices("..domain.service..")
                    .applicationServices("..application..")
                    .adapter("incoming", "..adapters.incoming..")
                    .adapter("outgoing", "..adapters.outgoing..");

}
