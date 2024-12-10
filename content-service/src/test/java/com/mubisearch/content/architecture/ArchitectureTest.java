package com.mubisearch.content.architecture;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.library.Architectures;
import org.junit.jupiter.api.Test;

class ArchitectureTest {

    private final JavaClasses importedClasses = new ClassFileImporter().importPackages("com.mubisearch.content");

    @Test
    void shouldRespectHexagonalArchitecture() {
        Architectures.layeredArchitecture().consideringOnlyDependenciesInLayers()
                .layer("Domain").definedBy("com.mubisearch.content.domain..")
                .layer("Application").definedBy("com.mubisearch.content.application..")
                .layer("AdaptersIncoming").definedBy("com.mubisearch.content.adapters.incoming..")
                .layer("AdaptersOutgoing").definedBy("com.mubisearch.content.adapters.outgoing..")
                .layer("Configuration").definedBy("com.mubisearch.content.configuration..")

                .whereLayer("Domain").mayNotBeAccessedByAnyLayer()
                .whereLayer("Application").mayOnlyBeAccessedByLayers("AdaptersIncoming", "AdaptersOutgoing")
                .whereLayer("AdaptersIncoming").mayOnlyAccessLayers("Application")
                .whereLayer("AdaptersOutgoing").mayOnlyAccessLayers("Application")
                .whereLayer("Configuration").mayOnlyBeAccessedByLayers("AdaptersIncoming", "AdaptersOutgoing", "Application")

                .check(importedClasses);
    }


}
