<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Laboratorio_model extends CI_Model
{
    private $mytable;
    
    public function __construct(){
        parent::__construct();
        $this->mytable = 'laboratorio';
    }
    
    public function get($id){
        
        $this->db->where('id', $id);
        
        $query = $this->db->get($this->mytable);
        
        if (!is_null($query) && $query->num_rows()==1){
            $row = $query->row();
            
            $row->id = (int)$row->id;
            $row->glucemia_en_ayunas = (float)$row->glucemia_en_ayunas;
            $row->colesterol_total = (float)$row->colesterol_total;
            $row->trigliceridos = (float)$row->trigliceridos;
            $row->iga_total = (float)$row->iga_total;
            $row->ptog_desde = (float)$row->ptog_desde;
            $row->ptog_hasta = (float)$row->ptog_hasta;
            $row->colesterol_hdl = (float)$row->colesterol_hdl;
            $row->colesterol_ldl = (float)$row->colesterol_ldl;
            $row->got = (float)$row->got;
            $row->gpt = (float)$row->gpt;
            $row->antitransglutaminasa = (float)$row->antitransglutaminasa;
            $row->hba1c = (float)$row->hba1c;
            $row->fal = (float)$row->fal;
            $row->creatinina = (float)$row->creatinina;
            $row->clearence_de_creatinina = (float)$row->clearence_de_creatinina;
            $row->fg = (float)$row->fg;
            $row->proteinuria = (float)$row->proteinuria;
            $row->proteinuria_creatininuria = (float)$row->proteinuria_creatininuria;
            $row->urea = (float)$row->urea;
            $row->microalbuminuria = (float)$row->microalbuminuria;
            $row->nivel_de_riesgo_cardiovascular_global = (int)$row->nivel_de_riesgo_cardiovascular_global;
            $row->participacion_talleres_autocuidado = (int)$row->participacion_talleres_autocuidado;
            
            return $row;
            
        }else{
            return NULL;
        }
    }
    
    public function save($id) {
        
        $data = array('id' => $id);
        
        $query = $this->db->insert($this->mytable, $data);
        
        if ($query && $this->db->affected_rows()==1){
            
            return TRUE;
        }else{
            
            return FALSE;
        }
    }
    
    public function update($id, $data) {
        
        if ($this->db->field_exists($data['campo'], $this->mytable)) {
            
            $this->db->set($data['campo'], $data['nuevo_valor']);
            
            $this->db->where('id', $id);
            
            $query = $this->db->update($this->mytable);
            
            if ($query && $this->db->affected_rows()==1) {
                return TRUE;
            }
            else{
                return FALSE;
            }
        }
        else{
            
            return FALSE;
        }
        
    }
}