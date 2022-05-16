package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.Parent;
import com.example.wirtualneprzedszkole.repository.ParentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParentService {
    private final ParentRepo parentRepo;

    public Parent getParent(Long id) {
        return parentRepo.findById(id).orElseThrow();
    }
}
