package org.israelsantos.imc_pediatrico.controller;

import org.israelsantos.imc_pediatrico.entity.Children;
import org.israelsantos.imc_pediatrico.service.ChildrenService;
import org.israelsantos.imc_pediatrico.service.PdfReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class PdfReportController {

    private final ChildrenService childrenService;
    private final PdfReportService pdfReportService;

    public PdfReportController(
            ChildrenService childrenService,
            PdfReportService pdfReportService) {

        this.childrenService = childrenService;
        this.pdfReportService = pdfReportService;
    }

    @GetMapping("/api/children/{identification}/report")
    public ResponseEntity<byte[]> generateChildReport(
            @PathVariable String identification) {

        Optional<Children> child =
                childrenService.findById(identification);

        if (child.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        byte[] pdf =
                pdfReportService.generateChildReport(child.get());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=child-report-" +
                                identification +
                                ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}