<?php

class Diagnosticos_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function get($id) {
        
        $diagnostico = $this->db->get_where('diagnosticos', array('id'=>$id));
        
        if ((!is_null($diagnostico)) && ($diagnostico->num_rows()==1))
        {
            return $diagnostico->row();
        }
        else
        {
            return null;
        }
    }
    
    public function save($id) {
        
        $this->db->set('id', $id);
        
        $this->db->insert('diagnosticos');
        
        if ($this->db->affected_rows() == 1) 
        {
            return TRUE;
        }        
        else {
            return FALSE;        
        }
    }
    
    public function update($id, $control, $valor) {
        $set_control = TRUE;
        
        switch ($control){
            
            case "diabetes":
                $this->db->set('diabetes', $valor, FALSE);
                break;
            case "diabetes_semanas_gestacion":
                $this->db->set('diabetes_semanas_gestacion', $valor, FALSE);
                break;
            case "diabetes_tiempo_evolucion":
                $this->db->set('diabetes_tiempo_evolucion', $valor, FALSE);
                break;
            case "diabetes_tipo":
                $this->db->set('diabetes_tipo', $valor, FALSE);
                break;
            case "dislipemia":
                $this->db->set('dislipemia', $valor, FALSE);
                break;
            case "glucemia_alterada_en_ayunas":
                $this->db->set('glucemia_alterada_en_ayunas', $valor, FALSE);
                break;
            case "hipertension_arterial":
                $this->db->set('hipertension_arterial', $valor, FALSE);
                break;
            case "hipertension_arterial_tiempo_evolucion":
                $this->db->set('hipertension_arterial_tiempo_evolucion', $valor, FALSE);
                break;
            case "preclasificacion_rcvg":
                $this->db->set('preclasificacion_rcvg', $valor, FALSE);
                break;
            case "tolerancia_glucosa_alterada":
                $this->db->set('tolerancia_glucosa_alterada', $valor, FALSE);
                break;
                
            default: 
                $set_control = FALSE;
        }
        
        if ($set_control){            
            $this->db->where('id', $id);
            $this->db->update('diagnosticos');
            if ($this->db->affected_rows() == 1)
            {
                return TRUE;
            }
            
        }
        else
        {
            return FALSE;
        }
        
    }
    
}

